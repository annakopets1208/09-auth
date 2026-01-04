"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/api/clientApi";

interface EditProfileForm {
  username: string;
}

const EditProfile = () => {
  const router = useRouter();

  const { user, setUser } = useAuthStore();

  if (!user) return <p>Loading...</p>;

  const handleSubmit = async (formData: FormData) => {
    const { username } = Object.fromEntries(
      formData
    ) as unknown as EditProfileForm;
    const body = {
      email: user.email,
      username,
    };
    const updatedUser = await updateMe(body);
    setUser(updatedUser);
    router.push("/profile");
  };

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          ></Image>

          <form className={css.profileInfo} action={handleSubmit}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                name="username"
                className={css.input}
                defaultValue={user.username}
              />
            </div>

            <p>Email: {user.email}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button
                type="button"
                className={css.cancelButton}
                onClick={router.back}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default EditProfile;
