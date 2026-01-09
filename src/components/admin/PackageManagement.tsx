import { useState } from 'react';
import { usePackages, useCreatePackage, useUpdatePackage, useDeletePackage } from '@/hooks/usePackageAdmin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PackageForm from './PackageForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const PackageManagement = () => {
  const { data: packages, isLoading } = usePackages();
  const createPackage = useCreatePackage();
  const updatePackage = useUpdatePackage();
  const deletePackage = useDeletePackage();
  const { toast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = async (data: any) => {
    try {
      await createPackage.mutateAsync(data);
      toast({ title: 'Success', description: 'Package created successfully' });
      setShowForm(false);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingPackage) return;
    try {
      await updatePackage.mutateAsync({ id: editingPackage.id, ...data });
      toast({ title: 'Success', description: 'Package updated successfully' });
      setEditingPackage(null);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePackage.mutateAsync(deleteId);
      toast({ title: 'Success', description: 'Package deleted successfully' });
      setDeleteId(null);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const toggleActive = async (pkg: any) => {
    try {
      await updatePackage.mutateAsync({ id: pkg.id, is_active: !pkg.is_active });
      toast({
        title: 'Success',
        description: `Package ${pkg.is_active ? 'hidden' : 'published'} successfully`,
      });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-card">
        <PackageForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          isLoading={createPackage.isPending}
        />
      </div>
    );
  }

  if (editingPackage) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-card">
        <PackageForm
          initialData={editingPackage}
          onSubmit={handleUpdate}
          onCancel={() => setEditingPackage(null)}
          isLoading={updatePackage.isPending}
        />
      </div>
    );
  }

  return (
    <>
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-foreground">Safari Packages</h2>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Package
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {packages?.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{pkg.name}</p>
                      <p className="text-sm text-muted-foreground">{pkg.category}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">{pkg.location}</td>
                  <td className="px-6 py-4 text-foreground">{pkg.duration}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-foreground">${pkg.price_non_resident}</p>
                      <p className="text-muted-foreground">Res: ${pkg.price_resident}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {pkg.is_active ? 'Active' : 'Hidden'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleActive(pkg)}
                        title={pkg.is_active ? 'Hide' : 'Publish'}
                      >
                        {pkg.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingPackage(pkg)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => setDeleteId(pkg.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!packages || packages.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No packages yet. Add your first safari package!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Package</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this package? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PackageManagement;
