import { atomWithStorage } from "jotai/utils";

export const jwtTokenAtom = atomWithStorage("jwtToken", null);
export const globalUsername = atomWithStorage("username", null);