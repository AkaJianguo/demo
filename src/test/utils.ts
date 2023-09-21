
export function conversionIn(formulas, allTags) {
    const regex = /\{ptag\|(\d+)\}/g;
    // 替换标签
    let replacedString = formulas.replace(regex, (match, tagId) => {
      const matchingTag = allTags?.find(tag => tag.tagId === Number(tagId));
      return matchingTag ? `{${matchingTag.tagName}}` : match;
    });
  
    const vtagRegex = /\{vtag\|(\d+)\}/g;
    // 替换vtag
    replacedString = replacedString.replace(vtagRegex, (match, tagId) => {
      const matchingTag = allTags?.find(tag => tag.tagId === Number(tagId));
      return matchingTag ? `{${matchingTag.tagName}}` : match;
    });
  
    return replacedString;
  }