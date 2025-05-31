/* eslint-disable import/order */
"use client";
import React from "react";
import { Link } from "@heroui/link";
import { ThemeSwitch } from "./theme-switch";
import {
  DiscordLogoIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/config/site";
import clsx from "clsx";

function Header() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const nav_section_className = "w-full flex gap-4 items-center";

  return (
    <nav className="flex items-center justify-between gap-4 p-4">
      <div className={clsx(nav_section_className, "justify-start")}>
        <Link
          className="flex items-center gap-1 text-current"
          href="/"
          title="VibeJira Refactor"
        >
            <img
                className="h-8"
                src="/826456651690934324.webp"
                alt="9arm Default Dance"
            />
            <h1 className="text-sm font-semibold max-md:hidden">{siteConfig.name}</h1>
        </Link>
      </div>
      <div className={clsx(nav_section_className, "justify-center")} />
      <div className={clsx(nav_section_className, "justify-end")}>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href={siteConfig.links.github}
          title="VibeJira Github"
        >
          <GithubLogoIcon size={22} weight="fill" />
        </Link>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href={siteConfig.links.discord}
          title="9arm Discord"
        >
          <DiscordLogoIcon size={22} weight="fill" />
        </Link>
        <ThemeSwitch />
      </div>
    </nav>
  );
}

export default Header;
