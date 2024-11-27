import { useNavigate } from "react-router"

function UserCard() {

    const nav = useNavigate();
    const logout = () => {
        nav("login");
    }

    const userName = "Kevin Borges"
    const userMail = "KevinBorges@iscte-iul.pt"
  return (
    <li className="h-26 gap-4 py-4 flex items-center rounded-lg bg-secondaryGray shadow-lg w-full justify-start px-4 mt-auto">
        <span className="h-12 w-12 text-center flex items-center rounded-full justify-center text-2xl  bg-blue-700 text-secondaryGray">{((userName).split(" ")[0].charAt(0) + (userName).split(" ")[1].charAt(0)).toUpperCase()}</span>
        <section>
            <span className="text-lg w-full block">{userName}</span>
            <span className="text-lg text-gray-400">{userMail}</span>
        </section>
        <button onClick={logout} className="ml-auto h-full w-16 p-4  rounded-full hover:bg-primaryGray">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"

            >
            <g fill="#ff5252">
            <path
                fillRule="evenodd"
                d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75Z"
                clipRule="evenodd"
            />
            <path d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306 0 2.828 0 4.243.879 5.121.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121C20.617 2 19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879-.879.878-.879 2.293-.879 5.121Z" />
            </g>
            </svg>
        </button>
    </li>
  )
}
export default UserCard