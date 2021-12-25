import { parseCookies } from "nookies";

export default function Painel() {
  return (
    <div>
      <h1>Painel</h1>
    </div>
  );
}
export function getServerSideProps(context) {
  const cookies = parseCookies(context);
  console.log("cookies", cookies);
  return {
    props: {
      cookies,
    },
  };
}
