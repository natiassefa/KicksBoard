
import { auth, db } from "@/app/firestore";
import { authOptions } from "@/lib/auth-options";
import { de } from "date-fns/locale";
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";
import { Shoe } from "@/types";

async function addShoe(shoe: Shoe) {
    const session = await getServerSession(authOptions)
    let uid: string = ""
    if (session?.user?.uid) {
        uid = session.user.uid
    } else {
        console.log("No user session")
        return
    }

    await addDoc(collection(db, "Users", uid, "shoes"), {
        id: v4(),
        name: shoe.name,
        price: shoe.price,
        image: shoe.image,
        inStock: shoe.inStock,
        stock: shoe.stock,
    })
    .then(() => {
        console.log("Document successfully written!");
    }).catch((error) => {
        console.error("Error writing document: ", error);
    })
}



export default addShoe;