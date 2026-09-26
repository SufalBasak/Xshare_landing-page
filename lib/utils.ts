// lib/utils.ts

export type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | { [key: string]: any } 
  | ClassValue[];

/**
 * Lightweight standalone class-name helper compatible with clsx & tailwind-merge
 */
function toVal(mix: ClassValue): string {
  let k: number | string, y: string, str = "";

  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            if (str) str += " ";
            str += y;
          }
        }
      }
    } else if (mix) {
      for (k in mix) {
        if (mix[k]) {
          if (str) str += " ";
          str += k;
        }
      }
    }
  }

  return str;
}

export function clsx(...inputs: ClassValue[]): string {
  let i = 0, tmp: ClassValue, str = "";
  while (i < inputs.length) {
    if ((tmp = inputs[i++])) {
      const x = toVal(tmp);
      if (x) {
        if (str) str += " ";
        str += x;
      }
    }
  }
  return str;
}

/**
 * Merges class names without requiring external node_modules
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}
