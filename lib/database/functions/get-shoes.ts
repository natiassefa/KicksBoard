
import { auth, db } from "@/app/firestore";
import { authOptions } from "@/lib/auth-options";
import { Shoe } from "@/types";
import { de } from "date-fns/locale";
import { collection, doc, setDoc, getDoc, addDoc, query, getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";

async function getShoes() {
    let shoes: Shoe[] = []
    const session = await getServerSession(authOptions)
    let uid: string = ""
    if (session?.user?.uid) {
        uid = session.user.uid
    } else {
        console.log("No user session")
        return shoes
    }
    const q = query(collection(db, "Users", uid, "shoes"))
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            shoes.push(doc.data() as Shoe)
        });
    }

    return shoes

}


export default getShoes;