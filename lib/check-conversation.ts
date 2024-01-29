import { db } from "@/lib/db";

export async function findOrCreateConversation(
  memberOneId: string,
  memberTwoId: string
) {
  let conversation =
    (await findConvrsation(memberOneId, memberTwoId)) ||
    (await findConvrsation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

  return conversation;
}

async function findConvrsation(memberOneId: string, memberTwoId: string) {
  try {
    return db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function createNewConversation(memberOneId: string, memberTwoId: string) {
  try {
    return db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
