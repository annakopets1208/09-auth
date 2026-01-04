import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "View and edit your NoteHub profile",
  openGraph: {
    title: "Profile Page",
    description: "View and edit your NoteHub profile",
    url: "https://07-routing-nextjs-rust-nu.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Profile",
      },
    ],
  },
};

const Profile = async () => {
  const user = await getMe();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href={"/profile/edit"} className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
