import Link from "next/link";
import { NavbarLinks } from "../../[lang]/(storefront)/components/NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon, Menu, Search } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import type { Cart } from "@/app/lib/interfaces";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-rose-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-black text-lg">B</span>
              </div>
            </div>
            <span className="font-black text-2xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              BULGARIAN ROSE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavbarLinks lang="en" />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-rose-50 rounded-xl">
              <Search className="h-5 w-5" />
            </Button>

            <LanguageSwitcher />
            
            {user ? (
              <>
                <Link
                  href="/bag"
                  className="relative p-3 hover:bg-rose-50 rounded-xl transition-all duration-300 group"
                >
                  <ShoppingBagIcon className="h-6 w-6 text-gray-600 group-hover:text-rose-600 transition-colors" />
                  {total > 0 && (
                    <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs flex items-center justify-center font-bold shadow-lg">
                      {total}
                    </span>
                  )}
                </Link>
                <UserDropdown
                  email={user.email as string}
                  name={user.given_name as string}
                  userImage={user.picture ?? `https://i.pravatar.cc/300`}
                />
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="ghost" className="text-gray-600 hover:bg-rose-50 rounded-xl">
                  <LoginLink>Sign in</LoginLink>
                </Button>
                <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-lg">
                  <RegisterLink>Get Started</RegisterLink>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-600 hover:bg-rose-50 rounded-xl">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white border-rose-100">
                <div className="flex flex-col space-y-6 mt-8">
                  <NavbarLinks lang="en" />
                  {!user && (
                    <div className="flex flex-col space-y-3 pt-6 border-t border-rose-100">
                      <Button variant="ghost" className="text-gray-600 hover:bg-rose-50 rounded-xl justify-start">
                        <LoginLink>Sign in</LoginLink>
                      </Button>
                      <Button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 rounded-xl justify-start">
                        <RegisterLink>Get Started</RegisterLink>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}