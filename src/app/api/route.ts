"use server";
import { version } from '../../../package.json';

export async function GET() {
    return Response.json({
        message: "Hello VibeJira API!",
        appVersion: version,
    });
}