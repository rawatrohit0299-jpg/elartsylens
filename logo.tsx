import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo() {
  return (
    <div className="relative w-12 h-12 overflow-hidden rounded-full transition-all duration-700 group-hover:scale-110">
      <Image 
        src="https://lh3.googleusercontent.com/pw/AP1GczM_5tBlTLHhUj1y5mnga2e1Ino2sMdvhPJT8VBzKUyJGobzX8qR7zGfWBAzuPhiQDLkl2VvlSwuxsOtrlQJrHXAz54PvIpBp45aOA83UQ5W_f9wVJdWU0n2SzASWpyUGrjhkGZp_lr07cCUvp3x_G1z9Q=w1594-h1594-s-no-gm?authuser=0"
        alt="El Artsy Lens Logo"
        fill
        className={cn(
          "transition-all duration-700 object-cover",
          "mix-blend-screen scale-110 group-hover:scale-125"
        )}
      />
    </div>
  )
}
