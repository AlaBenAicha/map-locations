import React from "react";
import { List, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../utils/authUser";

function SideMenu({
  user: { email, username },
  pc = true
}) {
  const router = useRouter();

  const isActive = route => router.pathname === route;

  let homeTabText = 
  router.locale === "en-US"
    ? "Home"
    : router.locale === "fr"
    ? "Accueil"
    : router.locale === "ar" 
    ? "لصفحة الرئيسية" 
    : "";

    let accountTabText = 
  router.locale === "en-US"
    ? "Account"
    : router.locale === "fr"
    ? "Compte"
    : router.locale === "ar" 
    ? "الحساب" 
    : "";

    let locationsTabText = 
  router.locale === "en-US"
    ? "Locations"
    : router.locale === "fr"
    ? "Emplacements"
    : router.locale === "ar" 
    ? "الموقع" 
    : "";

    let addLocationTabText = 
  router.locale === "en-US"
    ? "Add Location"
    : router.locale === "fr"
    ? "Ajouter Enplacement"
    : router.locale === "ar" 
    ? "أضف الموقع" 
    : "";

    let logoutTabText = 
  router.locale === "en-US"
    ? "Logout"
    : router.locale === "fr"
    ? "Déconnecter"
    : router.locale === "ar" 
    ? "تسجيل خروج" 
    : "";
  return (
    <>
      <List style={{ paddingTop: "1rem" }} size="big" verticalAlign="middle" selection>
        <Link href="/">
          <List.Item active={isActive("/")}>
            <Icon name="home" size="large" color={isActive("/") && "teal"} />
            <List.Content>{pc && <List.Header content={homeTabText} />}</List.Content>
          </List.Item>
        </Link>
        <br />
        <br />
        <br />

        <Link href={`/${username}`}>
          <List.Item active={router.query.username === username}>
            <Icon
              name="user"
              size="large"
              color={router.query.username === username && "teal"}
            />
            <List.Content>{pc && <List.Header content={accountTabText} />}</List.Content>
          </List.Item>
        </Link>
        <br />

        <Link href={`/locations`}>
          <List.Item active={isActive("/locations")}>
          <i class="map marker alternate icon" color={isActive("/locations") && "teal"}></i>
            <List.Content>{pc && <List.Header content={locationsTabText} />}</List.Content>
          </List.Item>
        </Link>
        <br />
        <br />

        <Link href={`/locations/newLocation`}>
          <List.Item active={isActive("/newLocation")}>
          <i class="plus square outline icon" color={isActive("/newLocation") && "teal"}></i>
            <List.Content>{pc && <List.Header content={addLocationTabText} />}</List.Content>
          </List.Item>
        </Link>
        <br />

        <List.Item onClick={() => logoutUser(email)}>
          <Icon name="log out" size="large" />
          <List.Content>{pc && <List.Header content={logoutTabText} />}</List.Content>
        </List.Item>
      </List>
    </>
  );
}

export default SideMenu;
