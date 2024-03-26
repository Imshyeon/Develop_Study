import Link from "next/link";

// 모든 클라이언트 나열
export default function ClientsPage() {
  const clients = [
    { id: "max", name: "Maxmilian" },
    { id: "zoe", name: "Zoe" },
    { id: "taemin", name: "Taemin" },
  ];
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
