import { UserButton } from "@clerk/nextjs";
import { GlobalNav } from "@/components/global-nav";

const NavBar = () => {
    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4">
                <div>
                    Store Switcher
                </div>
                <GlobalNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;