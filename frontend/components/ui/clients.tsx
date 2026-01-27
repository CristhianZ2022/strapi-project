import { fetchClients } from "@/lib/api";
import { useEffect } from "react";


export function Clients() {

  useEffect(() => {
    fetchClients().then((data) => {
      console.log(data);
    });
  }, []);

  return <div>Clients</div>;
}