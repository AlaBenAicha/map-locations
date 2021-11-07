import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import { Grid } from "semantic-ui-react";
import cookie from "js-cookie";
// import ProfileMenuTabs from "../components/Profile/ProfileMenuTabs";
// import ProfileHeader from "../components/Profile/ProfileHeader";
// import UpdateProfile from "../components/Profile/UpdateProfile";

function ProfilePage({
  errorLoading,
  user,
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showToastr, setShowToastr] = useState(false);

  const [activeItem, setActiveItem] = useState("profile");
  const handleItemClick = clickedTab => setActiveItem(clickedTab);

  const ownAccount = user._id === user._id;

  //if (errorLoading) return <NoProfile />;

 


  const socket = useRef();

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit("join", { userId: user._id });
    }

    return () => {
      if (socket.current) {
        socket.current.emit("disconnect");
        socket.current.off();
      }
    };
  }, []);

  return (
    <>
      {showToastr}

      <Grid stackable>

        <Grid.Row>
          {/* <Grid.Column>
            {activeItem === "profile" && (
              <>
                <ProfileHeader
                  profile={user}
                  ownAccount={ownAccount}
                />
              </>
            )} */}
           
           {/* 
            {activeItem === "updateProfile" && <UpdateProfile Profile={profile} />}

            {activeItem === "settings" && (
              <Settings newMessagePopup={user.newMessagePopup} />
            )} */}
          {/* </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </>
  );
}

ProfilePage.getInitialProps = async ctx => {
  try {
    const { username } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/user/${username}`, {
      headers: { Authorization: token }
    });

    const { user } = res.data;

    return { user };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default ProfilePage;
