export function TransformSecondToTime(second: number): string {
    const hours = Math.floor(second / 3600);
    const min = Math.floor((second - hours * 3600 ) / 60);
    return hours + ":" + (min< 10 ? "0" + min : min);
}
