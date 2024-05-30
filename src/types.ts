export interface ApiResponse<Result = object> {
    data?: {
        count: number;
        next: string | null;
        previous: string | null;
        results: Result[];
    };
    endpointName: string;
    isError: boolean;
    isFetching: boolean;
    isLoading: boolean;
    requestId: string;
    status: "fulfilled" | "rejected";
}

export interface User {
    email: string;
    firstName?: string;
    lastName?: string;
    username: string;
}
