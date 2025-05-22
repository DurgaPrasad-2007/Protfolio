import React from "react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href="https://github.com/DurgaPrasad-2007"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Durga Prasad
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/DurgaPrasad-2007/Protfolio"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
