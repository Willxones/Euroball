import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import { deleteUser, sendPasswordResetEmail, updateEmail } from "firebase/auth";
import auth from "../../utils/firebaseConfig";

export default function Account() {
    const authContext = useContext(AuthContext);
    const { user, logOut, loading } = authContext;
    const [ resetEmail, setResetEmail ] = useState("");
    const navigate = useNavigate();
    const handleSignOut = () => {
        logOut()
          .then(() => {
            console.log("User logged out successfully");
            navigate("/login"); // Redirect to the login page after logout
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch((error: any) => console.error(error));
      };
      const handleDeleteAccount = () => {
        deleteUser(user).then(() => {
            navigate("/")
          }).catch((error) => {
            console.log(error)
          });
      }
      const handleResetPassword = () => {
        sendPasswordResetEmail(auth, user?.email).then(() => {
                console.log("Email sent")
            }).catch((error) => {
                console.log(error)
            })
      }
      const handleUpdateEmail = () => {
        updateEmail(user, resetEmail).then(() => {
            console.log("Email updated")
        }).catch((error) => {
            console.log(error)
        })
      }
    return(
        <>
            <div className="mx-auto flex w-full max-w-lg flex-col rounded-md border border-gray-300 bg-gray-200 p-4 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <h1 className="text-lg font-semibold">Your Account</h1>
                <div className="flex flex-col">
                    <a onClick={handleSignOut} className="cursor-pointer border-b-2 border-gray-300 py-2 hover:text-gray-600 dark:border-gray-700">Saved Articles</a>
                    <a onClick={handleUpdateEmail} className="cursor-pointer border-b-2 border-gray-300 py-2 hover:text-gray-600 dark:border-gray-700">Update Email</a>
                    <div className="border-b-2 border-gray-300 py-2 dark:border-gray-700"><input className="" value={resetEmail} onChange={e => setResetEmail(e.target.value)}></input></div>
                    <a onClick={handleResetPassword} className="cursor-pointer border-b-2 border-gray-300 py-2 hover:text-gray-600 dark:border-gray-700">Reset Password</a>
                    <a onClick={handleSignOut} className="cursor-pointer border-b-2 border-gray-300 py-2 hover:text-gray-600 dark:border-gray-700">Log Out</a>
                    <a onClick={handleDeleteAccount} className="cursor-pointer border-gray-300 py-2 text-red-600 hover:text-gray-600 dark:border-gray-700">Delete Account</a>
                </div>
            </div>
        </>
    )
}