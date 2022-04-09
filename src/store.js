import * as sha from 'js-sha256'

export function getDoc(hash) {
  console.log('getDoc', hash)
  let content = localStorage.getItem(hash);
  console.log('getDoc content', content);
  return localStorage.getItem(hash)
}

export function storeDoc(content) {
  console.log('store', content);
  let hash = sha.sha256(content).slice(0,24);
  localStorage.setItem(hash, content);
  return hash;
}