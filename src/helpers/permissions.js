export function isInClub(clubsArray, clubID) {
  if (!clubsArray || !clubID) return null;
  const check = clubsArray.filter((club) => club.id === clubID);

  if (check.length === 0) return false;
  else return true;
}

export function isAdmin(club, userID) {
  if (!club || !userID || !club.admins) return false;

  if (club.admins || club.superAdmin) {
    const adminArray = club.admins;
    const superAdmin = club.superAdmin && club.superAdmin.id;
    const check = adminArray.filter((admin) => admin.id === userID);
    const check2 = superAdmin === userID;

    if (check.length > 0) return true;
    else if (check2) return true;
    else return false;
  }

  return false;
}

export function isFoundryAdmin(email) {
  if (
    email === 'korlov9026@bths.edu' ||
    email === 'mbilik0726@bths.edu' ||
    email === 'iakram2586@bths.edu' ||
    email === 'aseylanov9340@bths.edu'
  ) {
    return true;
  }

  return false;
}
