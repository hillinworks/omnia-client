import { Injectable } from "@angular/core";

// tslint:disable:max-line-length
const accentFrom = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
const accentTo = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";

export function makeSlug(text: string): string {

  text = text.replace(/^\s+|\s+$/g, ""); // trim
  text = text.toLowerCase();

  // remove accents, swap ñ for n, etc
  for (let i = 0, l = accentFrom.length; i < l; ++i) {
    text = text.replace(new RegExp(accentFrom.charAt(i), "g"), accentTo.charAt(i));
  }

  text = text.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return text;
}


