import { Helmet } from "react-helmet-async";

export default function PageTitle({ title }) {
  return (
    <Helmet>
      <title>RemindMe | {title}</title>
      <meta name="description" content={`${title} - RemindMe App`} />
    </Helmet>
  );
}
