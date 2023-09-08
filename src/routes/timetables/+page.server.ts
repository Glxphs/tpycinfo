// @ts-ignore
import type { PageServerLoad } from './$types';

const projectId = '1205449919775821';
const accessToken = '1/1205449917100704:41ee1bef393d0b5f437aaff7fbec92ab';

const url = `https://app.asana.com/api/1.0/projects/${projectId}/tasks?opt_fields=due_on,name,notes,tags,memberships.section.name`;

// @ts-ignore
export const load: PageServerLoad = async ({fetch, params}) => {
    // Fetch the json data from Asana, Authenticated with a bearer token
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    // Parse the json data
    const data = await res.json();

    // Return the data
    return {
        data: data
    }
};