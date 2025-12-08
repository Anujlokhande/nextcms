const adminEmail = ["anujlokhande25@gmail.com", "test@gmail.com"];

export default async function isAdmin(session) {
  if (!session) {
    console.log("Session is not available");
    return false;
  }
  // console.log(session.user);

  const userEmail = await session.user?.email.toLowerCase().trim();
  let emailMatch = adminEmail.some((each) => {
    return each.toLowerCase().trim().includes(userEmail);
  });
  // console.log(emailMatch);

  if (session.user.role == "admin" || (session.user?.email && emailMatch)) {
    return true;
  }
  return false;
}
