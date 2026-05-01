-- SCOS Seed Data
-- This matches the exact 6 scenarios for the authentication flow.

-- Clear existing data (in reverse order of dependencies)
DELETE FROM user_institute_roles;
DELETE FROM roles;
DELETE FROM users;
DELETE FROM institutes;
DELETE FROM tenants;

-- 1. Create a Master Tenant
INSERT INTO tenants (id, name, code, status) 
VALUES ('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'SchoolCoreOS Global', 'SCOS', 'active');

-- 2. Create Institutes
-- We need at least 5 for Ayush L to see the search bar.
INSERT INTO institutes (id, tenant_id, name, code, type, location) VALUES
('b1111111-1111-1111-1111-111111111111', 'd7890ec4-1923-4e8c-9a2c-f098c1234567', 'Greenwood High', 'GWH', 'School', 'Oregon'),
('b2222222-2222-2222-2222-222222222222', 'd7890ec4-1923-4e8c-9a2c-f098c1234567', 'Oakridge Academy', 'ORA', 'Academy', 'California'),
('b3333333-3333-3333-3333-333333333333', 'd7890ec4-1923-4e8c-9a2c-f098c1234567', 'Riverside Public', 'RPS', 'School', 'Washington'),
('b4444444-4444-4444-4444-444444444444', 'd7890ec4-1923-4e8c-9a2c-f098c1234567', 'Sunnyside Primary', 'SSP', 'Primary', 'Nevada'),
('b5555555-5555-5555-5555-555555555555', 'd7890ec4-1923-4e8c-9a2c-f098c1234567', 'Bluebell International', 'BBI', 'International', 'Oregon');

-- 3. Create Roles
INSERT INTO roles (id, name, code) VALUES
('r1111111-1111-1111-1111-111111111111', 'Super Admin', 'SUPER_ADMIN'),
('r2222222-2222-2222-2222-222222222222', 'Principal', 'PRINCIPAL'),
('r3333333-3333-3333-3333-333333333333', 'Teacher', 'TEACHER'),
('r4444444-4444-4444-4444-444444444444', 'Accountant', 'ACCOUNTANT');

-- 4. Create Users (Password hash for '123' if bcrypt is used, otherwise '123' works with bypass)
INSERT INTO users (id, first_name, last_name, full_name, email, password_hash) VALUES
('u1111111-1111-1111-1111-111111111111', 'Ayush', 'L', 'Ayush L', 'ayushl@gmail.com', '123'),
('u2222222-2222-2222-2222-222222222222', 'Ayush', 'N', 'Ayush N', 'ayushn@gmail.com', '123'),
('u3333333-3333-3333-3333-333333333333', 'Divyanshu', 'Last', 'Divyanshu', 'divyanshu@gmail.com', '123'),
('u4444444-4444-4444-4444-444444444444', 'Pratik', 'Last', 'Pratik', 'pratik@gmail.com', '123'),
('u5555555-5555-5555-5555-555555555555', 'Ayush', 'B', 'Ayush B', 'ayushb@gmail.com', '123');

-- 5. Map User-Institute-Roles (The Scenario Logic)

-- ayushl@gmail.com (5 Institutes + Multiple Roles) -> Search Bar + Selection Flow
INSERT INTO user_institute_roles (tenant_id, institute_id, user_id, role_id) VALUES
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b1111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111111', 'r1111111-1111-1111-1111-111111111111'),
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b1111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111111', 'r2222222-2222-2222-2222-222222222222'),
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b2222222-2222-2222-2222-222222222222', 'u1111111-1111-1111-1111-111111111111', 'r1111111-1111-1111-1111-111111111111'),
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b2222222-2222-2222-2222-222222222222', 'u1111111-1111-1111-1111-111111111111', 'r3333333-3333-3333-3333-333333333333'),
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b3333333-3333-3333-3333-333333333333', 'u1111111-1111-1111-1111-111111111111', 'r1111111-1111-1111-1111-111111111111'),
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b4444444-4444-4444-4444-444444444444', 'u1111111-1111-1111-1111-111111111111', 'r1111111-1111-1111-1111-111111111111'),
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b5555555-5555-5555-5555-555555555555', 'u1111111-1111-1111-1111-111111111111', 'r1111111-1111-1111-1111-111111111111');

-- ayushn@gmail.com (1 Institute + 1 Role) -> Direct Dashboard
INSERT INTO user_institute_roles (tenant_id, institute_id, user_id, role_id) VALUES
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b1111111-1111-1111-1111-111111111111', 'u2222222-2222-2222-2222-222222222222', 'r1111111-1111-1111-1111-111111111111');

-- divyanshu@gmail.com (1 Institute + Multiple Roles) -> Direct Role Selection
INSERT INTO user_institute_roles (tenant_id, institute_id, user_id, role_id) VALUES
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b1111111-1111-1111-1111-111111111111', 'u3333333-3333-3333-3333-333333333333', 'r1111111-1111-1111-1111-111111111111'),
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b1111111-1111-1111-1111-111111111111', 'u3333333-3333-3333-3333-333333333333', 'r4444444-4444-4444-4444-444444444444');

-- pratik@gmail.com (3 Institutes + Multiple Roles) -> Institute Selection (No Search Bar)
INSERT INTO user_institute_roles (tenant_id, institute_id, user_id, role_id) VALUES
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b1111111-1111-1111-1111-111111111111', 'u4444444-4444-4444-4444-444444444444', 'r1111111-1111-1111-1111-111111111111'),
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b2222222-2222-2222-2222-222222222222', 'u4444444-4444-4444-4444-444444444444', 'r2222222-2222-2222-2222-222222222222'),
('d7890ec4-1923-4e8c-9a2c-f098c1234567', 'b3333333-3333-3333-3333-333333333333', 'u4444444-4444-4444-4444-444444444444', 'r1111111-1111-1111-1111-111111111111');

-- ayushb@gmail.com (0 Mappings) -> Error Screen
-- No entries for u5555555...
