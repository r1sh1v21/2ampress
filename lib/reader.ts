// Reader content for "100 Things To Do After A Breakup". Structured data the
// reader renders itself — this is not a PDF. One entry == one screen.

export type Entry = {
  number: number;
  title: string;
  body: string;
};

// Keyed by book slug so the reader works for any title that has content.
export const entriesBySlug: Record<string, Entry[]> = {
  "100-things-after-a-breakup": [
    {
      number: 3,
      title: "Archive it. Don't perform deleting it.",
      body: "You don't have to nuke every photo at midnight to prove you're over it. Move them to a folder named 'later.' Out of your camera roll, out of your face — but not a whole performance for an audience that isn't watching. You're not doing this for anyone else.",
    },
    {
      number: 7,
      title: "Make the bed you cried in.",
      body: "It's a small lie you tell the room: today is a different day than yesterday. You don't have to believe it. You just have to pull the corner tight and let the made bed argue with you a little. Order is a thing you can hand yourself for free.",
    },
    {
      number: 11,
      title: "Eat the thing they hated.",
      body: "The smell that wasn't allowed in the apartment. The restaurant that was 'too much.' Order it. Take up the space your mouth was quietly making smaller. This is the pettiest kind of healing and it counts double.",
    },
    {
      number: 16,
      title: "Tell one person the real number.",
      body: "Not 'I'm fine.' The actual number — how many times you checked their Instagram today. Out loud, to someone who won't flinch. Shame loses most of its power the second it's said out loud to a person instead of carried alone in your head.",
    },
    {
      number: 23,
      title: "Change one thing you can see from the bed.",
      body: "Move the lamp. Turn the frame around. Put the plant where the other side of the room used to be. You're not redecorating your grief away — you're just making sure the first thing your eyes land on in the morning isn't a museum of them.",
    },
    {
      number: 29,
      title: "Cry in the shower if that's the only place that feels safe.",
      body: "It still counts. Grief doesn't need a journal and candlelight to be valid. Sometimes it just needs four minutes of hot water and a door that locks. Do it there. Get out. Eat something afterward.",
    },
    {
      number: 34,
      title: "Walk somewhere with no destination.",
      body: "Not for steps, not for the glow-up. Just to let your body do something while your brain catches up. Forty minutes, no podcast, no plan. You'll think the same thoughts — but moving, which is a different kind of thinking them.",
    },
    {
      number: 41,
      title: "Unfollow before you unfriend.",
      body: "You don't owe anyone a dramatic, public cutoff. Mute the stories first. Quiet the noise before you make any permanent decision about the relationship. You're allowed to need less information, not more.",
    },
    {
      number: 58,
      title: "Move before you scroll.",
      body: "Whatever the first ten minutes after waking up usually look like, change the order. Feet on the floor before the phone's in your hand. The scroll will still be there in ten minutes. Give your body a head start before your brain finds something to spiral about.",
    },
    {
      number: 72,
      title: "Write the text. Don't send the text.",
      body: "Open the notes app, not the messages. Say all of it — the cruel part, the begging part, the part you'd never admit in daylight. Get it out of your chest and into a place that can't betray you. The relief was never about them reading it.",
    },
  ],
};

export function getEntries(slug: string): Entry[] {
  return entriesBySlug[slug] ?? [];
}

export function hasReader(slug: string): boolean {
  return (entriesBySlug[slug]?.length ?? 0) > 0;
}
