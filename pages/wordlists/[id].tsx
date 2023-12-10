import { useRouter } from "next/router";
import React from "react";

const Wordlist = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>This is the wordlist page for list with id: {id}</div>;
};

export default Wordlist;
