import { useState } from "react"

export default function Home() {
    const [Username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const handleSeach = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/${Username}`);
            if (!response.ok) throw new Error("User not found");
            const data = await response.json();
            setUserData(data);
            setError(null);
        } catch (err) {
            setError(err.mensage);
            setUserData(null);
        }
    }

    return (

        <main className="flex flex-col gap-4 items-center justify-center w-full h-full max-w-screen-md mx-auto ">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search" />
            <header className="flex w-full justify-between pb-6">
                <h1 className="font-semibold hover:font-extrabold text-lg">devfinder</h1>
                <h1 className="font-serif text-base font-light"></h1>
            </header>
            <div className="flex justify-between items-center w-full h-16 bg-card-box rounded-lg p-3 gap-4 shadow-xl">
                <h1><span class="material-symbols-outlined">
                    search
                </span></h1>
                <input placeholder="Search GitHub username..." type="text" className="flex-1 h-full outline-none bg-transparent" value={Username} onChange={(e) => setUsername(e.target.value)} />
                <button className="px-8 h-full bg-[#0079FE] rounded-lg " onClick={handleSeach}><h1 className="flex items-center"><span class="material-symbols-outlined">
                    search
                </span></h1></button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {userData && (
                < div className="flex w-full h-96 bg-card-box rounded-xl p-12 shadow-xl gap-8  ">
                    <div className="justify-center w-1/4 h-full  ">
                        <img className="w-28 h-28 mt-10" src={userData.avatar_url} alt={userData.login} />
                    </div>
                    <div className="flex flex-col w-full h-full">
                        <div className="flex w-full justify-between">
                            <h1 className="font-semibold hover:font-extrabold text-lg">{userData.name || "No Name"}</h1>
                            <h1 className="font-serif">Joined {new Date(userData.created_at).toLocaleDateString()}</h1>
                        </div>
                        <div className="flex h-16 w-full justify-between">
                            <h1 className=" font-serif font-light text-sm hover:font-extrabold text-[#0C5BBA] h-4">@{userData.login}</h1>
                        </div>
                        <div className="flex h-14 w-full justify-between">
                            <h1 className=" font-serif font-light text-sm hover:font-extrabold text-indigo-200 ">{userData.bio || "No Name This profile has no bio"}</h1>
                        </div>
                        <div className="flex flex-col h-32 w-full bg-background justify-between rounded-xl shadow-xl ">
                            <div className="flex w-full justify-between px-8 pt-4">
                                <h1>Repos</h1>
                                <h1> Followers</h1>
                                <h1>Following</h1>
                            </div>
                            <div className="flex w-full justify-between px-8 pb-8 font-extrabold text-lg">
                                <h1>{userData.public_repos}</h1>
                                <h1>{userData.followers}</h1>
                                <h1>{userData.following}</h1>
                            </div>
                        </div>
                        <div className="flex h-8 w-full justify-between mt-8 ">
                            <h1 className=" font-serif font-light text-sm hover:font-extrabold text-indigo-200 ">{userData.location || "Location not available"}</h1>
                            <h1 className=" font-serif font-light text-sm hover:font-extrabold text-indigo-200 ">{userData.twitter_userName ? `@${userData.twitter_userName}` : "Twitter not available"}</h1>
                        </div>
                        <div className="flex h-2 w-full justify-between ">
                            <h1 className=" font-serif font-light text-sm hover:font-extrabold text-indigo-200 ">{userData.blog || "Blog not available"}</h1>
                            <h1 className=" font-serif font-light text-sm hover:font-extrabold text-indigo-200 ">{userData.login}</h1>
                        </div>
                    </div>
                </div>
            )}
        </main >
    )
}
