const adjectives = [
  "admiring", "adoring", "affectionate", "amazing", "awesome",
  "beautiful", "blissful", "bold", "brave", "charming", "clever",
  "compassionate", "confident", "cool", "dazzling", "determined",
  "dreamy", "eager", "ecstatic", "elastic", "elated", "elegant",
  "eloquent", "epic", "exciting", "fervent", "festive", "flamboyant",
  "focused", "friendly", "funny", "gallant", "gifted", "gracious",
  "great", "happy", "heuristic", "hopeful", "infallible", "inspiring",
  "intelligent", "interesting", "jolly", "jovial", "keen", "kind",
  "laughing", "loving", "lucid", "magical", "modest", "musing",
  "mystifying", "nice", "nifty", "nostalgic", "objective", "optimistic",
  "peaceful", "pensive", "practical", "priceless", "quirky", "quizzical",
  "relaxed", "reverent", "romantic", "serene", "sharp", "silly",
  "sleepy", "stoic", "sweet", "tender", "trusting", "unruffled",
  "upbeat", "vibrant", "vigilant", "vigorous", "wizardly", "wonderful",
  "xenodochial", "youthful", "zealous", "zen"
];

const animals = [
  "aardvark", "alpaca", "antelope", "armadillo", "badger", "bat",
  "bear", "beaver", "bison", "bobcat", "buffalo", "butterfly",
  "camel", "cheetah", "chinchilla", "chipmunk", "cobra", "cougar",
  "coyote", "crane", "crow", "deer", "dingo", "dolphin",
  "dragonfly", "eagle", "echidna", "elephant", "elk", "falcon",
  "ferret", "flamingo", "fox", "gazelle", "giraffe", "gorilla",
  "hedgehog", "heron", "hummingbird", "iguana", "jaguar", "kangaroo",
  "koala", "lemur", "leopard", "lion", "llama", "lynx",
  "manatee", "marmot", "meerkat", "mongoose", "monkey", "moose",
  "narwhal", "ocelot", "octopus", "orangutan", "ostrich", "otter",
  "owl", "panda", "panther", "parrot", "peacock", "pelican",
  "penguin", "porcupine", "possum", "puma", "quokka", "rabbit",
  "raccoon", "ram", "raven", "reindeer", "rhino", "salamander",
  "seal", "serval", "shark", "skunk", "sloth", "snowyowl",
  "sparrow", "squirrel", "stork", "swan", "tiger", "toad",
  "tortoise", "toucan", "walrus", "warthog", "weasel", "whale",
  "wolf", "wolverine", "wombat", "yak", "zebra"
];

export function generateRandomName(): string {
  const adjective = getRandomItem(adjectives)
  const animal = getRandomItem(animals)
  return `${adjective}-${animal}`
}

function getRandomItem<T>(array: T[]): T {
  if (array.length < 1) throw new Error("Array doesn't contain elements.")
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}
