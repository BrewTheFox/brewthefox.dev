import {md5} from 'js-md5'

async function crack(difficulty:number, salt:number, hash:string, iv:string, cipher: string) {
    let code = ""
    for (let i = 1; i < difficulty; i++) {
        if (md5((salt + i).toString()) == hash) {
            code = (salt + i).toString()
            break
        }
    }

    const msgBuffer = new TextEncoder().encode(code)
    const hashBuffer = (await crypto.subtle.digest('SHA-256', msgBuffer)).slice(0,32)

    const initialValue = Uint8Array.from(atob(iv))
    const cipherText = Uint8Array.from(atob(cipher))

    try {
        const cryptoKey = await crypto.subtle.importKey(
            "raw",
            hashBuffer,
            {name: "AES-GCM"},
            false,
            ["decrypt"]
        );

        const decryptedBuffer = await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: initialValue,
            tagLength: 128
        },

        cryptoKey,
        cipherText
    )

    return new TextDecoder().decode(decryptedBuffer)
    }

    catch {
        return "Decryption error."
    }
}

self.onmessage = function(e) {
    self.postMessage("a")
}