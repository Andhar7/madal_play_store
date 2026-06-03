import {NativeModules, Platform} from 'react-native'

const {AgeSignals} = NativeModules

export type UserStatus =
    | 'VERIFIED'
    | 'DECLARED'
    | 'SUPERVISED'
    | 'SUPERVISED_APPROVAL_PENDING'
    | 'SUPERVISED_APPROVAL_DENIED'
    | 'UNKNOWN'
    | 'null'

export interface AgeSignalResult {
    userStatus: UserStatus
    ageLower: number | null
    ageUpper: number | null
}

export async function checkAgeSignals(): Promise<AgeSignalResult | null> {
    if (Platform.OS !== 'android') return null
    if (!AgeSignals) return null
    try {
        return await AgeSignals.checkAgeSignals()
    } catch {
        return null
    }
}

export function isAccessDenied(result: AgeSignalResult | null): boolean {
    return result?.userStatus === 'SUPERVISED_APPROVAL_DENIED'
}
