import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// Regex to check whether something has an extension, e.g. .jpg
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const { nextUrl, headers, cookies } = request;
  // Cloned url to work with
  const url = nextUrl.clone();
  // Client language, defaults to en
  const language =
    headers
      .get("accept-language")
      ?.split(",")?.[0]
      .split("-")?.[0]
      .toLowerCase() || "en";

      // Helpful console.log for debugging
  // console.log({
  //   nextLocale: nextUrl.locale,
  //   pathname: nextUrl.pathname,
  //   cookie: cookies.NEXT_LOCALE,
    
  //   clientLanguage: language,
  // });

  try {
    // Early return if it is a public file such as an image or an api call
    if (PUBLIC_FILE.test(nextUrl.pathname) || nextUrl.pathname.includes("/api")) {
      return undefined;
    }

    

    // Proceed without redirection if on a localized path
    // if (
    //   nextUrl.pathname.startsWith("/en") ||
    //   nextUrl.pathname.startsWith("/uk") 
    // ) {
    //   return undefined;
    // }

    if (language === "uk") {
      url.pathname = `/uk${nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }

    
    if (language === "en") {
      url.pathname = `/en${nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }

    return undefined;
  } catch (error) {
    console.log(error);
  }
}