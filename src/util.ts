

interface CreateFontParam extends Partial<Omit<g.DynamicFontParameterObject, "game">> {
  size: number;
}


export function createFont(param: CreateFontParam) {
  return new g.DynamicFont({
    game: g.game,
    fontFamily: param.fontFamily ?? "sans-serif",
    ...param,
  });
};