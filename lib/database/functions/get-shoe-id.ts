import { db } from "@/app/firestore";
import { authOptions } from "@/lib/auth-options";
import { Shoe } from "@/types";
import { collection, query, getDocs, where } from "firebase/firestore";
import { getServerSession } from "next-auth";

async function getShoesWithId(id:string): Promise<Shoe | null> {
    let shoe  = null
    const session = await getServerSession(authOptions)
    let uid: string = ""
    if (session?.user?.uid) {
        uid = session.user.uid
    } else {
        console.log("No user session")
        return shoe
    }
    const q = query(collection(db, "Users", uid, "shoes"), where("id", "==", id))
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            shoe = doc.data() as Shoe
        });
    }

    return shoe

}


export default getShoesWithId;