const adminEmail = ["anujlokhande25@gmail.com", "test@gmail.com"];

export default async function isAdmin(session) {
  if (!session) {
    console.log("Session is not available");
    return false;
  }
  let emailMatch = adminEmail.map((each, idx) => {
    each.toLowerCase().trim().includes(session.user.email.toLowerCase().trim());
  });
  if (session.user.role == "admin" || (session.user?.email && emailMatch)) {
    return true;
  }
  return false;
}
