// this is the next js middleware file used to protect the routes. https://nextjs.org/docs/app/api-reference/file-conventions/middleware . It's asks for the supabase request (whcih is the JWT cookie session from the user) and if the user is not authenticated, it redirects to the login page.

import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'


export async function middleware(request: NextRequest) {
  return await updateSession(request)
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
