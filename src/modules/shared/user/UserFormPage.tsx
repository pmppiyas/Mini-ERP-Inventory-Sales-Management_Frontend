import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { IUser } from '@/interfaces/user.interface';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  ArrowLeft,
  ImagePlus,
  User as UserIcon,
  Mail,
  Phone,
  ShieldCheck,
  KeyRound,
  X,
  Loader2,
} from 'lucide-react';

import {
  useAddUserMutation,
  useUpdateUserMutation,
} from '@/redux/features/user/user.api';
import {
  addUserSchema,
  updateUserSchema,
  type AddUserFormValues,
  type UpdateUserFormValues,
} from '@/validation/addUser.schema';
import { error_message } from '@/utils/error_message';

interface UserFormPageProps {
  mode: 'add' | 'edit';
  user?: IUser;
}

const ROLE_OPTIONS = ['ADMIN', 'MANAGER', 'EMPLOYEE'] as const;

const PERMISSION_OPTIONS = [
  'manage-products',
  'manage-categories',
  'manage-orders',
  'manage-users',
  'view-reports',
] as const;

type UserFormValues = AddUserFormValues | UpdateUserFormValues;

const UserFormPage = ({ mode, user }: UserFormPageProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    mode === 'edit' ? (user?.photoUrl ?? null) : null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isNewImage, setIsNewImage] = useState(false);

  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const isLoading = isAdding || isUpdating;

  const schema = mode === 'add' ? addUserSchema : updateUserSchema;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      name: user?.name ?? '',
      phone: user?.phone ?? '',
      email: user?.email ?? '',
      role: user?.role ?? 'EMPLOYEE',
      permissions: user?.permissions ?? [],
      photoUrl: user?.photoUrl ?? '',
      password: '',
      repeatPassword: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setIsNewImage(true);
  };

  const clearImage = () => {
    setPreview(mode === 'edit' ? (user?.photoUrl ?? null) : null);
    setImageFile(null);
    setIsNewImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const togglePermission = (permission: string, checked: boolean) => {
    const current = form.getValues('permissions') ?? [];
    const next = checked
      ? [...current, permission]
      : current.filter((p) => p !== permission);
    form.setValue('permissions', next, { shouldValidate: true });
  };

  const onSubmit = async (values: UserFormValues) => {
    const formData = new FormData();

    const payload: Record<string, unknown> = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: values.role,
      permissions: values.permissions,
    };

    if (values.password) {
      payload.password = values.password;
    }

    if (values.repeatPassword) {
      payload.repeatPassword = values.repeatPassword;
    }

    formData.append('data', JSON.stringify(payload));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (mode === 'add') {
        await addUser(formData as any).unwrap();
        toast.success('User added successfully!');
      } else {
        await updateUser({ id: user!._id, data: formData }).unwrap();
        toast.success('User updated successfully!');
      }
      navigate('/admin/users');
    } catch (err) {
      const errorMessage = error_message(err);
      toast.error(errorMessage);
    }
  };

  const watchedValues = form.watch();

  const pageTitle = mode === 'add' ? 'Add User' : 'Edit User';
  const pageDesc =
    mode === 'add'
      ? 'Fill in the details to add a new user'
      : 'Update the user details below';
  const submitLabel = mode === 'add' ? 'Add User' : 'Save Changes';
  const submittingLabel = mode === 'add' ? 'Adding...' : 'Saving...';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ── Header ── */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">{pageTitle}</h1>
            <p className="text-xs text-muted-foreground">{pageDesc}</p>
          </div>
          {/* Edit mode badge */}
          {mode === 'edit' && (
            <span className="ml-auto text-[10px] font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              Editing: {user?.email}
            </span>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT — Image Upload / Preview */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div
              className="relative bg-muted h-72 lg:h-full min-h-72 flex items-center justify-center cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm font-medium">
                      Click to {isNewImage ? 'change' : 'replace'} photo
                    </p>
                  </div>
                  {/* Remove / Reset button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearImage();
                    }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors z-10"
                    title={isNewImage ? 'Remove new photo' : 'Remove photo'}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  {/* Badge: shows whether it's the existing or new image */}
                  {mode === 'edit' && (
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                          isNewImage
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-black/50 text-white'
                        }`}
                      >
                        {isNewImage ? 'New photo' : 'Current photo'}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground p-6">
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                    <ImagePlus className="h-7 w-7" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      Click to upload photo
                    </p>
                    <p className="text-xs mt-1">JPG, PNG, WEBP — max 5MB</p>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* RIGHT — Form Fields */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-5 flex flex-col justify-between">
            <div className="flex flex-col space-y-5">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Rahim Uddin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="e.g. rahim@example.com"
                          disabled={mode === 'edit'}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 01700000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                      Role
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLE_OPTIONS.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role.charAt(0) + role.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password + Repeat Password */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm">
                        <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                        {mode === 'add' ? 'Password' : 'New Password'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={
                            mode === 'add'
                              ? 'Min. 8 characters'
                              : 'Leave blank to keep current'
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repeatPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm">
                        <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                        Repeat Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Re-type password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Permissions */}
              <FormField
                control={form.control}
                name="permissions"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm">Permissions</FormLabel>
                    <div className="grid grid-cols-2 gap-2 rounded-xl border border-border p-3">
                      {PERMISSION_OPTIONS.map((permission) => {
                        const checked =
                          watchedValues.permissions?.includes(permission) ??
                          false;
                        return (
                          <label
                            key={permission}
                            className="flex items-center gap-2 text-xs cursor-pointer"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(value) =>
                                togglePermission(permission, Boolean(value))
                              }
                            />
                            {permission
                              .split('-')
                              .map(
                                (w) => w.charAt(0).toUpperCase() + w.slice(1)
                              )
                              .join(' ')}
                          </label>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {submittingLabel}
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserFormPage;
