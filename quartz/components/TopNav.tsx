import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { pathToRoot, isAbsoluteURL } from "../util/path"
import style from "./styles/topNav.scss"

type NavLink = {
  label: string
  href: string
}

interface Options {
  links: NavLink[]
}

const defaultOptions: Options = {
  links: [
    { label: "首页", href: "/" },
    { label: "技术", href: "/tech/" },
    { label: "项目", href: "/projects/" },
    { label: "随笔", href: "/chat/" },
    { label: "标签", href: "/tags/" },
  ],
}

export default ((userOpts?: Partial<Options>) => {
  const opts: Options = {
    ...defaultOptions,
    ...userOpts,
    links: userOpts?.links ?? defaultOptions.links,
  }

  const TopNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const root = pathToRoot(fileData.slug!)
    const base = root === "." ? "./" : `${root}/`

    return (
      <nav class={classNames(displayClass, "top-nav")} aria-label="Primary">
        <div class="top-nav-inner">
          {opts.links.map((l) => {
            const absolute = isAbsoluteURL(l.href)
            const href = absolute
              ? l.href
              : l.href === "/"
                ? base
                : base + l.href.replace(/^\//, "")

            return (
              <a
                class={classNames("top-nav-link", absolute ? "external" : "internal")}
                href={href}
              >
                {l.label}
              </a>
            )
          })}
        </div>
      </nav>
    )
  }

  TopNav.css = style
  return TopNav
}) satisfies QuartzComponentConstructor
