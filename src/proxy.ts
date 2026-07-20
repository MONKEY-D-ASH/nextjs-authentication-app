import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname // extracting the pathname from the request object which is incoming form the browser

  const isPublicPath = path === '/login' || path === '/signup' // these two path should not be visible to the user after they are logged in, and to know that we know that they have a token in their cookies 

// we know that the incoming http request that we are sending from the the frontend using axios contains the cookie object inside it which it includes in the request automatically becasue we are sending the request on the same domain 
  const token = request.cookies.get('token')?.value || ""

// now based on these two information we can decide whether we want to let the user to make the api call or not
  if( isPublicPath && token ){
    // this is a server side nextjs method to redirect the user to a different page, like the useRouter.push() method for the client side redirecting as it is a react hook and will only work on the client side 
    return NextResponse.redirect(new URL('/', request.nextUrl)) // this method requires an absolute URL like (https://example.com)and the request.nextUrl extracts the domain name from the incoming request url and then merges the provided path in it and create a new absolute url and passes it into the redirect() and it sends an http response to the browser with an HTTP response with a 307 status code and the browser sees this and abandons the current request and make a new request to the url that we sent it.
  }


}
 
// these are the paths that i want to intercept and make changes or allow the api call to reach the endpoint or not by manipulating the request coming on that route using the program which we define in the code above
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup'
  ]
}
// This is a matcher option that allows you to target specific paths for the Proxy to run on.

// Without a matcher, Proxy runs on every request, including static files (_next/static), image optimizations (_next/image), and assets in the public/ folder. Consider using a negative match pattern to exclude these paths, otherwise auth logic or redirects can unintentionally block CSS, JS, or images from loading.

// You can specify paths in several ways:

// For a single path: Directly use a string to define the path, like '/about'.
// For multiple paths: Use an array to list multiple paths, such as matcher: ['/about', '/contact'], which applies the Proxy to both /about and /contact.