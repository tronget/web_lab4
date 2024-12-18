import { atomWithStorage } from "jotai/utils";

export const jwtTokenAtom = atomWithStorage("jwtToken", null);
export const globalUsernameAtom = atomWithStorage("username", null);