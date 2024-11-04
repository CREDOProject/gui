export function toKebabCase(input: string): string {
  return input
    .trim()
    .normalize("NFD")                      // Normalize to separate accents
    // https://en.wikipedia.org/wiki/List_of_Unicode_characters#Combining_marks
    .replace(/[\u0300-\u036f]/g, "")       // Remove accent marks
    .replace(/([a-z])([A-Z])/g, '$1-$2')   // Separate camelCase words
    .replace(/[\s_]+/g, '-')               // Replace spaces and underscores with hyphens
    .replace(/[^a-zA-Z0-9-]/g, '')         // Remove punctuation except hyphens
    .toLowerCase();                        // Convert to lowercase
}
