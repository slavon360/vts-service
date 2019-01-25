export const showAdditionalInfo = (object) => {
    const entries = Object.entries(object);
    const finalEntries = entries.filter(item => /^(?!Цена)[а-яА-ЯЁё]/.test(item[0]) && /^(?!выбрать вариант)/.test(item[1]));
    return finalEntries;
}