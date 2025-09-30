export default {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["@tanstack/eslint-plugin-query"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          // disables cross-feature imports:
          // eg. src/features/discussions should not import from src/features/comments, etc.
          {
            target: "./src/features/auth",
            from: "./src/features",
            except: ["./auth"],
          },
          {
            target: "./src/features/comments",
            from: "./src/features",
            except: ["./comments"],
          },
          {
            target: "./src/features/discussions",
            from: "./src/features",
            except: ["./discussions"],
          },
          {
            target: "./src/features/teams",
            from: "./src/features",
            except: ["./teams"],
          },
          {
            target: "./src/features/users",
            from: "./src/features",
            except: ["./users"],
          },

          // More restrictions...
        ],
      },
    ],
  },
};
