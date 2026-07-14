The "use client" directive is a string used in Next.js (App Router) to declare a boundary that switches a component file and its dependencies from a Server Component to a Client Component.

By default, Next.js treats every component as a Server Component to maximize performance, lower browser bundle sizes, and improve SEO. Adding "use client" at the very top of a file tells the framework that the component needs to run code inside the browser.

When Do You Need "use client"?

You must explicitly use this directive if your file utilizes any browser-specific or interactive React features:

React Hooks: Such as useState(), useEffect(), useRef(), or useContext().
Event Listeners: Such as onClick, onChange, or onSubmit.
Browser APIs: Directly calling window, document, localStorage, or sessionStorage.
Custom Client Hooks / Libraries: Using features like usePathname() from next/navigation or interactive libraries like Framer Motion