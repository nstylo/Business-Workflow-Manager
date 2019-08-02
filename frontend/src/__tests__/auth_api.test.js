import { login, register } from "../components/auth/forms/auth_api";
import axios from "axios";
// axios mock is defined in __mocks__ in src/ and is automatically handled by jest

// clear .mock.calls after each test
afterEach(() => {
    axios.post.mockClear();
});

describe("login()", () => {
    it("should call axios post once", async () => {
        await login();
        expect(axios.post.mock.calls.length).toBe(1);
    });

    it("should read and return empty strings", async () => {
        await login("", "").then(response => {
            expect(response.data.email).toBe("");
            expect(response.data.password).toBe("");
        });
    });

    it("should read some string and return it", async () => {
        await login("someValue", "someValue").then(response => {
            expect(response.data.email).toBe("someValue");
            expect(response.data.password).toBe("someValue");
        });
    });

    it("should read null and return empty strings", async () => {
        await login(null, null).then(response => {
            expect(response.data.email).toBe("");
            expect(response.data.password).toBe("");
        });
    });

    it("should read undefined and return empty strings", async () => {
        await login(undefined, undefined).then(response => {
            expect(response.data.email).toBe("");
            expect(response.data.password).toBe("");
        });
    });
});

describe("register()", () => {
    it("should call axios post once", async () => {
        await register();
        expect(axios.post.mock.calls.length).toBe(1);
    });

    it("should read and return empty strings", async () => {
        await register("", "", "", "", "").then(response => {
            expect(response.data.email).toBe("");
            expect(response.data.password).toBe("");
            expect(response.data.phone).toBe("");
            expect(response.data.address).toBe("");
            expect(response.data.company).toBe("");
        });
    });

    it("should read some string and return it", async () => {
        await register(
            "someValue",
            "someValue",
            "someValue",
            "someValue",
            "someValue"
        ).then(response => {
            expect(response.data.email).toBe("someValue");
            expect(response.data.password).toBe("someValue");
            expect(response.data.phone).toBe("someValue");
            expect(response.data.address).toBe("someValue");
            expect(response.data.company).toBe("someValue");
        });
    });

    it("should read null and return empty strings", async () => {
        await register(null, null, null, null, null).then(response => {
            expect(response.data.email).toBe("");
            expect(response.data.password).toBe("");
            expect(response.data.phone).toBe("");
            expect(response.data.address).toBe("");
            expect(response.data.company).toBe("");
        });
    });

    it("should read undefined and return empty strings", async () => {
        await register(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        ).then(response => {
            expect(response.data.email).toBe("");
            expect(response.data.password).toBe("");
            expect(response.data.phone).toBe("");
            expect(response.data.address).toBe("");
            expect(response.data.company).toBe("");
        });
    });
});
