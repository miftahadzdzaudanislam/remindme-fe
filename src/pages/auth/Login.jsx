import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import useDocumentTitle from "@/_hooks/utils/useDocumentTitle";
import UserInput from "@/components/ui/UserInput";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin, useLogin } from "@/_hooks/useAuth";
import { useEffect } from "react";
import useForcedAuthError from "@/_hooks/utils/useForcedAuthError";

export default function Login() {
  useDocumentTitle("Login");
  const navigate = useNavigate();
  const { login } = useGoogleLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    resetField,
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const loginMutation = useLogin();
  const { isPending, isError, error } = loginMutation;

  const { forcedError, clearForcedError } = useForcedAuthError();

  useEffect(() => {
    if (forcedError) {
      sessionStorage.removeItem("auth_error");
    }
  }, [forcedError]);

  // Reset password saat login gagal (error server)
  useEffect(() => {
    if (isError) {
      resetField("password");
    }
  }, [isError, resetField]);

  const onSubmit = (data) => {
    clearForcedError();
    loginMutation.mutate(data);
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-secondary to-primary flex items-center justify-center p-4 overflow-hidden">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        disabled={isPending}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Kembali</span>
      </motion.button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-light/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center pb-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-lg">
            <Lock size={28} />
          </div>
          <h1 className="text-3xl font-bold text-light">Selamat Datang</h1>
          <p className="text-sm text-white mt-2">Login untuk masuk</p>
        </div>

        {/* Error Server */}
        {(error || forcedError) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 bg-red-500/20 border border-red-400/50 rounded-lg p-4"
          >
            <AlertCircle size={20} className="text-red-300 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-red-200 text-sm font-medium">
                {error?.message || forcedError}
              </p>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-6">
          <UserInput
            label="Email"
            icon={Mail}
            type="email"
            placeholder="email@example.com"
            disabled={isPending}
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email tidak valid",
              },
            })}
            error={isSubmitted && errors.email?.message}
          />

          <UserInput
            label="Password"
            icon={Lock}
            type="password"
            placeholder="••••••••"
            passwordSuffix
            disabled={isPending}
            {...register("password", {
              required: "Password wajib diisi",
              minLength: {
                value: 8,
                message: "Password minimal 8 karakter",
              },
            })}
            error={isSubmitted && errors.password?.message}
          />

          {/* Remember Me */}
          {/* <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              disabled={isPending}
              className="w-4 h-4 rounded border-2 border-white/60 bg-white/70 accent-primary"
            />
            <label
              htmlFor="remember"
              className="text-sm text-white/90 cursor-pointer select-none"
            >
              Ingatkan saya
            </label>
          </div> */}

          {/* Submit */}
          <motion.button
            whileHover={{ scale: !isPending ? 1.02 : 1 }}
            whileTap={{ scale: !isPending ? 0.98 : 1 }}
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading...
              </div>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <div className="flex items-center py-4">
          <div className="flex-1 h-0.5 bg-gray-300"></div>
          <div className="flex gap-2 px-4 text-sm text-gray-300">
            Atau Lanjutkan dengan
          </div>
          <div className="flex-1 h-0.5 bg-gray-300"></div>
        </div>

        <motion.button
          whileTap={{ scale: !isPending ? 0.98 : 1 }}
          onClick={login}
          disabled={isPending}
          className="w-full bg-gray-50 text-black py-3 rounded-lg hover:bg-gray-200 border border-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading...
            </div>
          ) : (
            <div className="flex justify-center items-center gap-3">
              <FcGoogle size={25} />
              <span>Masuk Dengan Google</span>
            </div>
          )}
        </motion.button>

        {/* Register */}
        <p className="text-center text-sm text-white/90 pt-6">
          Belum punya akun?{" "}
          <Link to="/register" className="text-white font-bold hover:underline">
            Daftar
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
