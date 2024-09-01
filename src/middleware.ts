import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'

const token:boolean = false;

export function middleware(req:Request){
  const cookieStore = cookies();
  const cookie = cookieStore.get("user")
  if(cookie){
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher:["/dashboard"],
};