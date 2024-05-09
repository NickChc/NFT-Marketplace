import { getUsers } from "@/app/[lang]/_api/getUsers";

export default async function AdminOrdersPage() {
  const users = await getUsers();

  if (users == null) return;

  console.log(users[0].ownings[0]);
  return <div>{users[0].ownings[0].name}</div>;
}
